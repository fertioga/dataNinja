<!--
Sync Impact Report
- Version change: (none / template placeholders) → 1.0.0
- Modified principles: template slots [PRINCIPLE_1–5] replaced by product principles I–XVI
- Added sections: Audience, Mission, and Positioning; Product Constraints and Success; Governance (first ratification)
- Removed sections: none (template comments and unused placeholders)
- Follow-up TODOs: none
-->

# Data Ninja Constitution

## Core Principles

### I. Stay on the Page (NON-NEGOTIABLE)
The Data Ninja MUST resolve the user's need without forcing them to leave the
current page whenever the need can be handled in-context. The product MUST
continuously reduce tab switching, manual copy, repetitive typing, external
lookups, and unnecessary steps.

Rationale: Value is measured by uninterrupted work. Leaving the page is the
primary failure mode of the product.

### II. Toolbox, Not a Single Tool
The Data Ninja MUST evolve as a toolbox of small, independent tools for web
application work. New tools MAY be added across categories when they map to
real, recurring needs of the target audience. Tool count MUST NOT be treated as
value; a tool MUST be added only when it delivers clear utility.

Rationale: Variety is a product trait; clutter is not.

### III. Fake Data in Context
Fake-data generation is a core capability. The product MUST make it easy to
create test and validation data in multiple types and formats, and MUST connect
generation to the user's current context whenever possible. The goal is not
generation alone; it is filling, testing, and validating systems with minimal
effort.

### IV. Type Less
When the user is working with a form, the product MUST reduce manual filling.
Autofill is a primary expression of product value. Future evolution MUST keep
asking: how can the user type less? Intelligence and convenience MUST increase
without adding ceremony.

### V. Result Is for Immediate Use
A tool MUST treat its output as something the user will use immediately in the
current activity. The preferred path is generate → use. The product MUST NOT
stop at generate → copy → hunt → paste → resume when a shorter path exists.

### VI. In-Flow Experience
The Data Ninja MUST behave as a natural extension of the user's work. The
canonical loop is: testing → need arises → invoke Data Ninja → resolve →
continue testing. The product MUST NOT require a mental context switch to use
it.

### VII. Speed
The Data Ninja is a productivity tool. The user MUST reach a solution quickly.
The experience MUST avoid unnecessary steps, excess navigation, low-value
configuration, long copy for simple tasks, and work that could be automated.

### VIII. Simplicity
Internal complexity MUST NOT be transferred to the user. A simple task MUST
remain simple even as the toolbox grows. The user MUST be able to discover
quickly what a tool does, how to use it, what result it produces, and how to
apply that result.

### IX. Discoverability Without Slowing Recurring Use
The toolbox MUST let users find tools they do not yet know. Discovery MUST NOT
block access to the most important tools. Recurring users MUST reach frequent
tools quickly. New users MUST discover capabilities without prior knowledge of
the entire toolbox. Organization MUST balance discovery and speed.

### X. Consistency
Different tools MUST share coherent interaction patterns. After learning one
tool, the user MUST be able to understand others with little or no extra
learning. Naming, layout, and behavior MUST reinforce recognizable Data Ninja
patterns.

### XI. Global Product, Brazil First
The Data Ninja MUST be designed for professionals in multiple countries.
Brazilian-specific data and validation needs MAY be highlighted when relevant
and MUST NOT block international expansion. Strategy: Brazil as the initial
reference, the world as the horizon.

### XII. Domain Neutrality
The Data Ninja MUST NOT be limited to one application segment. Tools MUST be
useful across corporate systems, commercial apps, digital platforms, internal
systems, online services, and other web domains.

### XIII. Problem-Driven Evolution
New features MUST originate from real, recurring user problems. The governing
question is not "what can we add?" but "what recurring user problem are we
still not solving?" A technically interesting capability without clear utility
for QA, PO, or web development MUST NOT be prioritized merely because it is
possible.

### XIV. Information Quality
Results MUST be clear and reliable for the tool's purpose. Fake data MUST be
treated and presented as fake data. Test information MUST be presented so the
user understands its purpose. The product MUST NOT induce users to treat test
data as real information.

### XV. Professional Experience
The product MUST convey professionalism in organization, clarity, consistency,
naming, presentation, behavior, and user communication. Abandoned features,
inconsistent behavior, and improvised-feeling experiences MUST NOT ship as
product quality.

### XVI. The Tool Must Disappear
Success is not time spent inside the plugin. The user MUST resolve the need
and return to work as quickly as possible. The Data Ninja MUST become a
natural part of the workflow: "I need this. The Ninja handles it."

## Audience, Mission, and Positioning

The Data Ninja is a Swiss Army knife for developing and validating web
applications. It MUST put useful tools directly into the workflow of technology
professionals so QAs and Product Owners can perform recurring validation,
analysis, and data-preparation tasks without leaving the page they are on.

**Mission:** Eliminate small interruptions in QA and PO work by offering, in
the browser, the tools needed for development, validation, and analysis of web
applications.

**Positioning:** The Swiss Army knife for people who work with web
applications. It is not only a data generator and not only a tool catalog. It
is a set of small tools that keeps the user inside the working context.

**Primary audience:** QAs (form filling, behavior validation, fake data,
scenario testing, data manipulation, format checks, repetitive test tasks) and
Product Owners (system filling, flow validation, scenario reproduction,
behavior analysis, feature testing, information handling during validation).
Developers remain a relevant audience. Product decisions MUST prioritize QA and
PO needs.

**Core problem:** During web-app validation, users interrupt work to fetch
information or run auxiliary tasks, causing context switches, new tabs,
searches, external tools, copy/transfer, repeated work, and lost time. The
Data Ninja MUST reduce that friction.

## Product Constraints and Success

### What the Data Ninja MUST NOT Become
The product MUST NOT become a random tool dump, a generic tool without a
defined audience, a catalog of rarely used features, an app that demands
excess navigation, a tool that forces users out of context, a product that
values feature count over utility, or a complex experience for simple tasks.
Toolbox growth MUST preserve this identity.

### Gate for New Capabilities
Before adding a capability, all of the following MUST be answerable:

1. Who needs this? The need MUST relate primarily to QA, PO, or web
   development work.
2. What concrete problem does it solve?
3. Does this task happen often? Recurrence increases relevance.
4. Can Data Ninja solve it in the current context? Avoiding a context switch
   increases fit.
5. Does it reduce effort (time, clicks, typing, or research)?
6. Does it make the toolbox more useful without making it more confusing?

A proposal that fails this gate MUST NOT be treated as in-scope without an
explicit constitution amendment or documented exception.

### Success Criteria
Success MUST be judged by impact on user work, not by feature count. Relevant
signals include recurring use, tool-usage frequency, tasks completed, autofills
performed, user feedback, retention, user-base growth, adoption of new tools,
reduction of manual tasks, and QA/PO feedback. Feature count alone MUST NOT be
treated as success.

### Future Direction
The product MUST evolve from a toolbox that offers tools toward a toolbox that
better understands what the user is trying to do: tools → context → automation
→ productivity. It MUST keep seeking ways to anticipate needs, reduce manual
work, and keep the user focused on the system under validation.

### Final Principle
The Data Ninja exists to make QA, PO, and web-development work simpler. Value
is not hundreds of tools. Value is being available exactly when one tool is
needed, without forcing the user to abandon current work.

Brand line: Data Ninja — the Swiss Army knife for web development. Less context
switching. Less manual work. More productivity.

## Governance

This constitution supersedes informal product preference and feature requests
that conflict with the principles above. Specs, plans, tasks, reviews, and
implementation MUST be checked against these rules.

Amendments MUST be written into this file, bump `CONSTITUTION_VERSION` using
semantic versioning, update `LAST_AMENDED_DATE` (ISO `YYYY-MM-DD`), and record
rationale in the temporary Sync Impact Report until review. `RATIFICATION_DATE`
is the original adoption date and MUST NOT change on later amendments.

Versioning:

- MAJOR: removal or incompatible redefinition of a principle or of the
  primary audience / stay-on-the-page rule.
- MINOR: new principle or section, or material expansion of guidance.
- PATCH: clarification, wording, or non-semantic refinement.

Compliance review: pull requests and Spec Kit artifacts (spec, plan, tasks)
MUST verify that new work stays on the page when possible, serves QA/PO (or
explicitly justified developer) needs, passes the six-question feature gate,
preserves simplicity and consistency, and does not treat test data as real
data. Unjustified complexity or context-switching UX MUST be rejected or
redesigned.

Runtime development guidance follows this constitution; feature-level detail
belongs in the active spec, not in silent exceptions.

**Version**: 1.0.0 | **Ratified**: 2026-09-22 | **Last Amended**: 2026-09-22
