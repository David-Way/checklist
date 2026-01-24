## Scripts

```json
"scripts": {
    "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
    "build": "vite build", // build for production
    "preview": "vite preview", // locally preview production build
    "lint": "biome lint"
},
```


---

## Discovery
- [ ] conditional field behaviour example https://jsfiddle.net/cowbellerina/zbfh96b1/
- [ ] The current checklist definition schema is the schema for a yaml file. I want to use that yaml file to generate a simpler "schema" needed by RJSF.
- [ ] Form should use Live omit (onblur) to remove data for conditional fields
- Example of conditional display of fields
  https://rjsf-team.github.io/react-jsonschema-form/#eyJmb3JtRGF0YSI6eyJwYXJlbnQiOmZhbHNlLCJjaGlsZCI6MTB9LCJzY2hlbWEiOnsidHlwZSI6Im9iamVjdCIsInByb3BlcnRpZXMiOnsicGFyZW50Ijp7InR5cGUiOiJib29sZWFuIiwiZGVmYXVsdCI6ZmFsc2V9fSwicmVxdWlyZWQiOlsicGFyZW50Il0sImFsbE9mIjpbeyJpZiI6eyJwcm9wZXJ0aWVzIjp7InBhcmVudCI6eyJjb25zdCI6dHJ1ZX19fSwidGhlbiI6eyJwcm9wZXJ0aWVzIjp7ImNoaWxkIjp7InR5cGUiOiJpbnRlZ2VyIiwiZGVmYXVsdCI6MTB9fSwicmVxdWlyZWQiOlsiY2hpbGQiXX19XX0sInVpU2NoZW1hIjp7fSwidGhlbWUiOiJtdWkifQ==

```json
{
  "type": "object",
  "properties": {
    "parent": {
      "type": "boolean",
      "default": false
    }
  },
  "allOf": [
    {
      "if": {
        "properties": {
          "parent": {
            "const": true
          }
        }
      },
      "then": {
        "properties": {
          "child": {
            "type": "integer",
            "default": 10
          }
        },
      }
    }
  ]
}

```
---

## References

### Technology 
- [Github Primer Primitives](https://primer.style/product/primitives/)
- [Github Primer Storybook](https://primer.style/primitives/storybook/?path=/story/color-base-display-scales--all-scales)
- [js-yaml](www.npmjs.com/package/js-yaml)
- [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

---

## Phased Development Plan: YAML-Driven Conditional Checklist App

### Assumptions (Explicit)

1. **Single-page static app** hosted on GitHub Pages or similar.
2. **No persistence** in MVP beyond in-memory state (localStorage optional later).
3. **One checklist active at a time**.
4. YAML is **trusted input** in MVP (no sandboxing), but still validated.
5. Rich content is **authored as Markdown** embedded in YAML.
6. Conditional logic is **deterministic and declarative** (no arbitrary JS).
7. react-jsonschema-form (RJSF) is the **primary rendering engine**, not a custom form engine.

---

### 1. Phased Development Plan

#### Phase 0 – Foundations & Design (Pre-MVP)

**Goal:** De-risk schema design and conditional logic.

- [x] Define YAML schema (versioned)
- [ ] Define condition syntax and supported operators
- [ ] Define JSON Schema mapping rules
- [ ] Validate RJSF supports required conditional patterns (`dependencies`, `if/then/else`)
- [ ] Accessibility design review (keyboard + SR flows)

**Output**

- [ ] YAML spec document
- [ ] JSON Schema transformation contract

---

#### Phase 1 – MVP (Core Functionality)

**Scope**

- [ ] Hardcoded YAML checklist (bundled with app)
- [ ] YAML → JSON Schema conversion
- [ ] Render dynamic checklist via RJSF
- [ ] Conditional display of checklist sections
- [ ] Accessible UI

**Features**

- [ ] YAML parsing with error handling
- [ ] Markdown rendering for descriptions
- [ ] Boolean, enum, and text inputs
- [ ] Conditional logic via JSON Schema `if/then`
- [ ] Basic validation feedback

**Non-Goals**

* Saving user YAML
* Multiple checklists
* Exporting results

---

#### Phase 2 – V1 (Usability & Extensibility)

**Enhancements**

- [ ] Upload / paste custom YAML
- [ ] Version validation and migration warnings
- [ ] Themed checklist sections
- [ ] Expandable/collapsible sections
- [ ] Read-only summary view
- [ ] Persist responses in localStorage

---

#### Phase 3 – Future Enhancements

- [ ] Checklist result export (JSON / Markdown / PDF)
- [ ] YAML editor with validation hints
- [ ] Cross-item computed logic
- [ ] Localization support
- [ ] Plugin system for new input types

---

### 2. Proposed YAML Structure

#### Design Goals

* Human-authorable
* Versioned
* Declarative logic
* Compatible with JSON Schema
* Markdown-friendly

```yaml
version: 1.0
id: a11y-checklist
title: Accessibility Review Checklist
description: >
  A checklist for validating common accessibility considerations
  during design and development.

meta:
  author: Internal Design Systems Team
  lastUpdated: 2025-01-01

sections:
  - id: content
    title: Content & Structure
    items:
      - id: hasImages
        type: boolean
        label: Are there images on the page?
        description: |
          Images include photos, illustrations, icons, and charts.

      - id: imageAltText
        type: checklist
        label: Image accessibility
        description: |
          ### Image requirements
          Ensure all meaningful images have accessible text alternatives.
        when:
          field: hasImages
          equals: true
        items:
          - id: informativeAlt
            type: boolean
            label: Do informative images have appropriate alt text?

          - id: decorativeImages
            type: boolean
            label: Are decorative images marked as decorative?
```

---

### 3. Example YAML Snippet (Conditional Behavior)

```yaml
- id: videoContent
  type: boolean
  label: Is there video content?
  description: |
    Includes prerecorded or live video.

- id: videoA11y
  type: checklist
  label: Video accessibility checks
  when:
    field: videoContent
    equals: true
  items:
    - id: captions
      type: boolean
      label: Are captions provided?

    - id: audioDescription
      type: boolean
      label: Is audio description available where needed?
```

---

### 4. Mapping YAML → JSON Schema (RJSF)

#### Core Strategy

| YAML Concept             | JSON Schema           |
| ------------------------ | --------------------- |
| `section`                | Object property group |
| `type: boolean`          | `{ type: "boolean" }` |
| `checklist`              | Nested object         |
| `when`                   | `if` / `then`         |
| `description (Markdown)` | `ui:description`      |

#### Example Transformation

```json
{
  "type": "object",
  "properties": {
    "hasImages": {
      "type": "boolean",
      "title": "Are there images on the page?"
    },
    "imageAltText": {
      "type": "object",
      "title": "Image accessibility",
      "properties": {
        "informativeAlt": { "type": "boolean" },
        "decorativeImages": { "type": "boolean" }
      }
    }
  },
  "dependencies": {
    "hasImages": {
      "oneOf": [
        {
          "properties": {
            "hasImages": { "const": true },
            "imageAltText": { "type": "object" }
          }
        }
      ]
    }
  }
}
```

---

### 5. React Component & Folder Structure

```txt
src/
├─ app/
│  ├─ App.tsx
│  └─ routes.tsx
├─ components/
│  ├─ ChecklistForm.tsx
│  ├─ Section.tsx
│  ├─ ErrorBoundary.tsx
│  └─ MarkdownRenderer.tsx
├─ schema/
│  ├─ yamlParser.ts
│  ├─ schemaBuilder.ts
│  └─ validators.ts
├─ ui/
│  └─ shadcn/
├─ hooks/
│  └─ useChecklistState.ts
├─ data/
│  └─ a11y-checklist.yaml
└─ utils/
   └─ accessibility.ts
```

---

### 6. State Management & Data Flow

**State**

- [ ] Parsed YAML
- [ ] Generated JSON Schema
- [ ] Form data (RJSF controlled)
- [ ] UI state (errors, expanded sections)

**Flow**

1. Load YAML
2. Parse → validate
3. Transform → JSON Schema + UI Schema
4. Render via RJSF
5. Update form state on input
6. RJSF re-evaluates conditions automatically

No global state manager needed (use React state/hooks).

---

### 7. Handling Malformed or Invalid YAML

**Strategy**

* YAML parsing with `js-yaml`
* JSON Schema validation of parsed YAML structure
* Human-readable error messages:

  * Line/column number
  * Missing required fields
  * Unsupported condition operators

**UX**

* Fail fast
* Render error panel instead of form
* Never crash the app

---

### 8. Testing Strategy

#### Schema & Logic

* Unit tests for YAML → JSON Schema mapping
* Snapshot tests for generated schemas
* Invalid condition handling tests

#### UI Behavior

* Playwright / Cypress for:

  * Conditional reveal/hide
  * Keyboard navigation
  * Focus management

#### Accessibility

* axe-core automated checks
* Screen reader smoke tests (NVDA / VoiceOver)
* Manual keyboard testing

---

### 9. Key Architectural Decisions & Tradeoffs

#### Why YAML → JSON Schema (vs custom renderer)?

✅ Leverages RJSF’s battle-tested conditional logic
❌ JSON Schema conditionals are verbose and limited

#### Why declarative conditions only?

✅ Safe, predictable, statically analyzable
❌ Less expressive than full logic language

#### Why Markdown for rich content?

✅ Author-friendly, accessible
❌ Needs sanitization

---

## Critique & Risk Analysis

### Top 3 Risks & Mitigations

#### 1. **JSON Schema Conditional Complexity**

**Risk:** Complex conditions become unreadable or impossible
**Mitigation:**

* Limit MVP condition operators
* Introduce abstraction layer in YAML
* Allow future custom rule engine

---

#### 2. **Accessibility of Conditional Content**

**Risk:** Screen readers miss dynamically revealed content
**Mitigation:**

* Use ARIA live regions for section reveal
* Manage focus explicitly
* Test with real assistive tech early

---

#### 3. **YAML Authoring Errors**

**Risk:** Non-technical users struggle with YAML syntax
**Mitigation:**

* Provide examples & templates
* Add schema validation with friendly errors
* Future: visual YAML editor

---

### Final Thought

This architecture deliberately **optimizes for correctness, accessibility, and long-term extensibility**, while keeping the MVP achievable on a static host. The hardest problems—conditional logic and accessibility—are addressed early, not deferred.
