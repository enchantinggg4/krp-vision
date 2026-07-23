---
name: build-requirement-theses
description: Discover solution-neutral system requirements through a sequential dialogue of small, testable theses before designing the system itself. Use when the user wants to uncover problems and desired properties gradually, approve requirements one by one, alternate proposals with Codex, prevent premature solution design, or asks to "проработать тезисы по очереди" or "собрать требования перед проектированием".
---

# Build Requirement Theses

Build shared understanding before system design. Move through:

```text
problem -> requirement -> set of requirements -> system design
```

Maintain one active thesis at a time, refine it with the user, finalize it
explicitly, and only then move to the next thesis.

## Core protocol

1. Establish the system boundary and intended outcome from the conversation.
   Ask only for context that is necessary to formulate the first thesis.
2. Keep a compact numbered ledger of finalized theses.
3. Let either the user or Codex propose the next thesis. Prefer alternating the
   proposer when natural, but never block a useful user proposal to enforce a
   rigid turn order.
4. Classify every proposal as a problem, requirement, external constraint, or
   candidate solution before treating it as a thesis.
5. Work on exactly one active requirement thesis.
6. Refine that thesis locally until both parties accept its wording.
7. Mark it finalized only after explicit agreement or an equally unambiguous
   acceptance.
8. Only after finalization, invite or propose the next thesis.

Never propose a second thesis, even as an aside, while the current thesis is
unresolved.

## Requirement-solution gate

Accept a thesis into the requirements ledger only when it describes:

- an outcome or property that must be true;
- a behavior actors must be able or unable to observe;
- a boundary, invariant, or failure the system must prevent.

A problem statement motivates a thesis but is not itself a requirement. Every
finalized thesis must keep the motivating problem visible and state what the
system must guarantee in response.

A requirement defines **what must hold and why it matters**. A solution defines
**how the future system will make it hold**.

Before refining a proposal, apply these tests:

1. **Problem test:** What undesirable outcome, unmet need, or design goal
   motivates this statement?
2. **What-not-how test:** Does it describe the required result without choosing
   the mechanism that produces it?
3. **Multiple-solutions test:** Could at least two materially different designs
   satisfy it?
4. **Removal test:** If implementation nouns are removed, does a meaningful
   requirement remain?

Treat references to containers, tables, queues, services, endpoints, screens,
buttons, algorithms, object types, storage layouts, workflow components,
specific technologies, or named interaction mechanisms as solution signals
unless they are externally fixed constraints.

Precise observable behavior is still allowed. For example, "no single actor may
activate a high-impact change without independent confirmation" constrains the
result without deciding whether the design uses a reviewer, quorum, veto window,
automated policy check, or another mechanism.

If the user intentionally imposes an existing technology, legal rule,
compatibility contract, or other non-negotiable boundary, record it separately
as an **external constraint**. Do not confuse an imposed constraint with a
solution invented during the dialogue.

## When a proposal is already a solution

Do not finalize it as a requirement and do not improve it into an even more
detailed solution.

Instead:

1. State briefly that the proposal chooses a mechanism.
2. Ask what problem or desired property the mechanism is intended to address,
   or infer a narrow candidate requirement when the intent is already clear.
3. Present that solution-neutral requirement for approval as the sole active
   thesis.
4. Preserve the original mechanism in a separate candidate-solutions note for
   the later design phase.

Do not assume every attractive consequence of the proposed mechanism is an
intended requirement. For example:

```text
Proposed solution:
Route every high-impact change through a three-person review committee.

Candidate requirement:
No single actor may activate a high-impact change without independent
confirmation.

Preserved for later:
A three-person review committee is one candidate solution.
```

The candidate requirement above does not silently add voting rules, reviewer
roles, time limits, or escalation paths. Those properties require their own
evidence and, if important, their own theses.

## Shape of a good thesis

Write a thesis as one small, solution-neutral requirement that is easy to
accept, reject, or amend.

A good thesis is:

- concrete enough to constrain a future design;
- limited to one independently debatable rule;
- connected to an explicit problem, need, or desired property;
- phrased in observable outcomes or constraints where possible;
- free of vague qualifiers such as "normally", "conveniently", or "securely"
  unless those terms are defined;
- explicit about important scope words such as `all`, `only`, `before`, and
  `after`;
- capable of being satisfied by more than one plausible design unless it is an
  external constraint;
- independent of unrelated choices that deserve later theses.

Do not make a requirement so abstract that it stops constraining design.
"Important changes should be safe" is too broad. "No single actor may activate
a high-impact change without independent confirmation" is specific enough to
guide design without choosing its architecture.

## Refining the active thesis

Improve a user's rough thesis when a small local refinement makes it more
decidable without choosing a solution.

For example:

```text
Rough:
Important changes should be safe.

Refined candidate:
No single actor may activate a high-impact change without independent
confirmation.
```

Present such wording as a candidate, not as a silently accepted requirement.

When refining:

- name the underlying problem or desired outcome briefly;
- remove accidental implementation choices;
- identify what the thesis deliberately leaves undefined;
- surface only ambiguities that can change this thesis;
- do not start resolving roles, timing, ownership, escalation, or other adjacent
  rules unless they are part of the active thesis;
- do not turn one requirement into a miniature system specification.

If a proposal contains several independently contestable clauses, say so and
split it. Keep the first clause active and place the rest in a short pending
queue without discussing them yet.

## Interaction format

For an active thesis, normally use:

```markdown
Тезис N — Короткое название

Проблема: какое нежелательное состояние или цель требует этого правила.

> Одно точное требование, нейтральное к реализации.

Уточнение: какая архитектурная случайность была убрана из формулировки.

Пока не определяет: соседние вопросы, намеренно оставленные следующим тезисам.

Статус: предложен.
```

Adapt the language to the user. Keep the exchange conversational and compact.
Do not repeat the entire ledger during every iteration.

After acceptance:

```markdown
Зафиксировано: Тезис N — ...
```

Then either accept the user's next thesis or propose one missing requirement
that fits the emerging picture.

## Contributing Codex theses

Codex is a co-author, not only an editor. After the current thesis is finalized,
propose requirements suggested by:

- the stated goal and existing finalized theses;
- lifecycle transitions and failure states;
- incentives, abuse cases, and irreversible outcomes;
- different actors, permissions, and ownership boundaries;
- small and large operating scales;
- contradictions with the surrounding system.

Propose only one. State the motivating problem before the requirement. Do not
smuggle a preferred implementation or a checklist of future theses into its
rationale.

## Maintaining the ledger

Record for each finalized thesis:

- stable number;
- motivating problem or goal;
- final wording;
- optional one-line rationale only when needed;
- supersession link if a later decision explicitly replaces it.

Do not silently rewrite finalized theses. If new information conflicts with one,
reopen it explicitly, discuss the revision as the sole active thesis, and mark
the old wording superseded only after agreement.

Follow workspace rules for persistence. Keep the ledger in the conversation by
default; write or update project artifacts when the user requests it or the
project workflow requires durable capture.

## Deciding when there are enough theses

Consider the set ready for synthesis when it covers the important:

- actors and goals;
- objects, ownership, and permissions;
- normal lifecycle and state transitions;
- failure, recovery, and terminal states;
- resource or capacity constraints;
- adversarial behavior and abuse boundaries;
- interaction with neighboring systems;
- scale-dependent behavior.

This is a coverage heuristic, not a mandatory checklist. At a thesis boundary,
either the user may request synthesis or Codex may state that the requirement
picture is now sufficiently coherent and propose moving on.

## Transitioning to system design

Before designing:

1. Audit the finalized ledger for contradictions, duplicates, hidden compound
   rules, premature solutions, and important gaps.
2. Discuss any blocking conflict one thesis at a time.
3. Separate requirements, external constraints, preferences, candidate
   solutions, and unresolved questions.
4. Preserve every accepted requirement unless the user explicitly reopens it.

Then design the system as a response to the whole requirement set. Map important
design elements back to the theses they satisfy, and call out any requirement
that cannot be satisfied simultaneously with the others.

Evaluate preserved candidate solutions only at this stage. Do not begin
full-system design merely because one thesis suggests an obvious implementation.
