import {
  Actions,
  BackButton,
  Card,
  ErrorBanner,
  Hint,
  Honeypot,
  NextButton,
  Notice,
  Panel,
  RestoredBar,
  StepHeading,
  SubmitButton,
} from "./wizardStyles";
import { BUDGET_OPTIONS, GOAL_OPTIONS } from "../../lib/projectRequest/options";
import { FORM_STEPS, FieldErrors, FormStep, IProjectRequest } from "../../lib/projectRequest/types";
import { LIMITS, buildSubmission, isStepComplete, validateRequest, validateStep } from "../../lib/projectRequest/validate";
import React, { useEffect, useRef, useState } from "react";
import { FloatingField } from "./FloatingField";
import { GOAL_ICONS } from "./goalIcons";
import Link from "next/link";
import { PhoneField } from "./PhoneField";
import { RadioCards } from "./RadioCards";
import { StepProgress } from "./StepProgress";
import { Success } from "./Success";
import { submitProjectRequest } from "./submit";
import { useProjectDraft } from "../../hooks/useProjectDraft";

const STEP_COPY: Record<FormStep, { label: string; title: string; lead: string }> = {
  basics: { label: "The Basics", title: "First, the Basics.", lead: "Who we'll be talking to." },
  project: { label: "The Project", title: "Tell Us About the Project.", lead: "The music, the moment, and what you need from us." },
  budget: { label: "Budget", title: "What Are You Working With?", lead: "A rough range is fine. We'll shape the plan around it." },
};

const STEP_FIELDS: Record<FormStep, ReadonlyArray<keyof IProjectRequest>> = {
  basics: ["name", "email", "countryCode", "phone", "brandName"],
  project: ["about", "goal"],
  budget: ["budget"],
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  // Kept here because the draft (and so `values`) is cleared on success.
  | { kind: "success"; reference: string; name: string; email: string };

const stepOf = (field: string): FormStep =>
  FORM_STEPS.find((step) => (STEP_FIELDS[step] as ReadonlyArray<string>).includes(field)) ?? "basics";

function focusFirstInvalid(errors: FieldErrors): void {
  const first = Object.keys(errors)[0];
  if (!first) return;
  const element = document.getElementById(first) ?? document.getElementById(`field-${first}`);
  const target = element?.matches("input, textarea") ? element : element?.querySelector<HTMLElement>("input");
  target?.focus();
}

export const ProjectForm = () => {
  const { values, setValues, wasRestored, clearDraft } = useProjectDraft();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touched, setTouched] = useState<ReadonlySet<string>>(new Set());
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);

  const step = FORM_STEPS[stepIndex];
  const copy = STEP_COPY[step];
  const isLastStep = stepIndex === FORM_STEPS.length - 1;
  const canContinue = isStepComplete(step, values);
  const stepErrors = validateStep(step, values);
  const visibleErrors: FieldErrors = {
    ...Object.fromEntries(Object.entries(stepErrors).filter(([field]) => touched.has(field))),
    ...Object.fromEntries(Object.entries(serverErrors).filter(([field]) => stepOf(field) === step)),
  };

  useEffect(() => {
    if (hasNavigated.current) headingRef.current?.focus();
  }, [stepIndex]);

  const update = <K extends keyof IProjectRequest>(field: K, value: IProjectRequest[K]) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setServerErrors({});
  };

  const touch = (field: string) => setTouched((previous) => new Set([...Array.from(previous), field]));

  const goTo = (index: number) => {
    hasNavigated.current = true;
    setDirection(index > stepIndex ? 1 : -1);
    setStepIndex(index);
  };

  const revealErrors = (errors: FieldErrors) => {
    setTouched((previous) => new Set([...Array.from(previous), ...Object.keys(errors)]));
    window.requestAnimationFrame(() => focusFirstInvalid(errors));
  };

  const submit = async () => {
    const allErrors = validateRequest(values);
    if (Object.keys(allErrors).length > 0) {
      goTo(FORM_STEPS.indexOf(stepOf(Object.keys(allErrors)[0])));
      return revealErrors(allErrors);
    }
    setStatus({ kind: "submitting" });
    const result = await submitProjectRequest(buildSubmission(values));
    if (result.kind === "success") {
      setStatus({ kind: "success", reference: result.reference, name: values.name.trim(), email: values.email.trim() });
      return clearDraft();
    }
    const fields = Object.keys(result.fieldErrors);
    if (fields.length > 0) {
      setServerErrors(result.fieldErrors);
      goTo(FORM_STEPS.indexOf(stepOf(fields[0])));
      revealErrors(result.fieldErrors);
    }
    setStatus({ kind: "error", message: result.message });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (status.kind === "submitting") return;
    // Enter on an incomplete step shows what's missing instead of moving on.
    if (!canContinue) return revealErrors(stepErrors);
    if (isLastStep) return void submit();
    goTo(stepIndex + 1);
  };

  if (status.kind === "success") {
    return (
      <Success
        name={status.name || "there"}
        email={status.email}
        reference={status.reference}
        onStartAnother={() => {
          clearDraft();
          setTouched(new Set());
          setStepIndex(0);
          setStatus({ kind: "idle" });
        }}
      />
    );
  }

  return (
    <Card noValidate onSubmit={onSubmit} aria-labelledby="step-heading">
      <StepProgress current={stepIndex + 1} total={FORM_STEPS.length} label={copy.label} />

      <Panel key={step} $direction={direction}>
        <StepHeading>
          <h2 id="step-heading" ref={headingRef} tabIndex={-1}>
            {copy.title}
          </h2>
          <p>{copy.lead}</p>
        </StepHeading>

        {wasRestored && stepIndex === 0 && (
          <RestoredBar role="status">
            We restored your unfinished request.
            <button type="button" onClick={clearDraft}>
              Start over
            </button>
          </RestoredBar>
        )}

        {step === "basics" && (
          <>
            <FloatingField
              id="name" label="Your name" autoComplete="name" maxLength={LIMITS.name}
              value={values.name} error={visibleErrors.name}
              onChange={(value) => update("name", value)} onBlur={() => touch("name")}
            />
            <FloatingField
              id="email" label="Email" type="email" inputMode="email" autoComplete="email" maxLength={LIMITS.email}
              value={values.email} error={visibleErrors.email}
              onChange={(value) => update("email", value)} onBlur={() => touch("email")}
            />
            <PhoneField
              countryIso={values.countryCode}
              phone={values.phone}
              phoneMaxLength={LIMITS.phone}
              error={visibleErrors.phone ?? visibleErrors.countryCode}
              onCountryChange={(iso) => update("countryCode", iso)}
              onPhoneChange={(value) => update("phone", value)}
              onBlur={() => {
                touch("phone");
                touch("countryCode");
              }}
            />
            <FloatingField
              id="brandName" label="Artist or company name" autoComplete="organization" maxLength={LIMITS.brandName}
              value={values.brandName} error={visibleErrors.brandName}
              onChange={(value) => update("brandName", value)} onBlur={() => touch("brandName")}
            />
          </>
        )}

        {step === "project" && (
          <>
            <FloatingField
              id="about" label="Tell us about the music and what you need" multiline maxLength={LIMITS.about}
              value={values.about} error={visibleErrors.about}
              hint={`${values.about.trim().length} / ${LIMITS.aboutMin} characters minimum`}
              onChange={(value) => update("about", value)} onBlur={() => touch("about")}
            />
            <RadioCards
              name="goal" legend="Primary goal" options={GOAL_OPTIONS} icons={GOAL_ICONS}
              value={values.goal} error={visibleErrors.goal}
              onChange={(value) => update("goal", value)}
            />
          </>
        )}

        {step === "budget" && (
          <>
            <RadioCards
              name="budget" legend="Budget" options={BUDGET_OPTIONS} large
              value={values.budget} error={visibleErrors.budget}
              onChange={(value) => update("budget", value)}
            />
            <Honeypot aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input
                id="website" name="website" type="text" tabIndex={-1} autoComplete="off"
                value={values.website} onChange={(event) => update("website", event.target.value)}
              />
            </Honeypot>
            <Notice>
              By sending this you agree to HYPush contacting you about your project. See our{" "}
              <Link href="/privacy" target="_blank" rel="noopener noreferrer">
                privacy policy
              </Link>
              .
            </Notice>
          </>
        )}

        {status.kind === "error" && <ErrorBanner role="alert">{status.message}</ErrorBanner>}
      </Panel>

      <Actions>
        {stepIndex > 0 && (
          <BackButton type="button" onClick={() => goTo(stepIndex - 1)}>
            ← Back
          </BackButton>
        )}
        {isLastStep ? (
          <SubmitButton
            type="submit"
            disabled={!canContinue || status.kind === "submitting"}
            aria-describedby={canContinue ? undefined : "step-hint"}
            aria-busy={status.kind === "submitting"}
          >
            {status.kind === "submitting" ? "Sending…" : "Send my project"}
          </SubmitButton>
        ) : (
          <NextButton type="submit" disabled={!canContinue} aria-describedby={canContinue ? undefined : "step-hint"}>
            Next <span aria-hidden="true">→</span>
          </NextButton>
        )}
        {!canContinue && (
          <Hint id="step-hint" aria-live="polite">
            {step === "budget" ? "Choose a budget to send." : "Fill in the fields above to continue."}
          </Hint>
        )}
      </Actions>
    </Card>
  );
};
