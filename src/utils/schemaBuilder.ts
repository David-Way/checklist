/**
 * YAML → JSON Schema transformer
 *
 * Converts a validated checklist YAML definition into:
 *  - JSON Schema (data + conditional logic)
 *  - UI Schema (presentation, descriptions, a11y hooks)
 */

import type { JSONSchema7 } from "json-schema";

/* --------------------------------------------
 * Public API
 * ------------------------------------------ */

export function buildSchemas(yamlChecklist: ChecklistDefinition) {
  const jsonSchema: JSONSchema7 = {
    type: "object",
    properties: {},
    required: [],
  };

  const uiSchema: Record<string, any> = {};

  // Each section is flattened into the root schema,
  // but grouped visually using UI schema
  yamlChecklist.sections.forEach((section: any) => {
    buildSection(section, jsonSchema, uiSchema);
  });

  return { jsonSchema, uiSchema };
}

/* --------------------------------------------
 * Section handling
 * ------------------------------------------ */

function buildSection(
  section: Section,
  schema: JSONSchema7,
  uiSchema: Record<string, any>
) {
  section.items.forEach((item) => {
    buildItem(item, schema, uiSchema);
  });
}

/* --------------------------------------------
 * Item handling (core logic)
 * ------------------------------------------ */

function buildItem(
  item: Item,
  schema: JSONSchema7,
  uiSchema: Record<string, any>,
  parentPath: string[] = []
) {
  const fieldPath = [...parentPath, item.id];
  const fieldKey = fieldPath.join(".");

  // 1. Create base schema for this field
  const fieldSchema = buildFieldSchema(item);
  schema.properties![item.id] = fieldSchema;

  // 2. Mark as required if specified
  if (item.required) {
    schema.required = schema.required || [];
    schema.required.push(item.id);
  }

  // 3. Build UI schema for labels, descriptions, markdown
  uiSchema[item.id] = buildUiSchema(item);

  // 4. Handle conditional logic
  if (item.when) {
    applyCondition(item, schema);
  }

  // 5. Recursively process nested checklist items
  if (item.type === "checklist" && item.items) {
    const nestedSchema = fieldSchema as JSONSchema7;
    nestedSchema.type = "object";
    nestedSchema.properties = {};
    nestedSchema.required = [];

    item.items.forEach((child) => {
      buildItem(child, nestedSchema, uiSchema[item.id], fieldPath);
    });
  }
}

/* --------------------------------------------
 * Field schema generation
 * ------------------------------------------ */

function buildFieldSchema(item: Item): JSONSchema7 {
  switch (item.type) {
    case "boolean":
      return {
        type: "boolean",
        title: item.label,
      };

    case "string":
      return {
        type: "string",
        title: item.label,
      };

    case "enum":
      return {
        type: "string",
        title: item.label,
        enum: item.options?.map((o) => o.value),
      };

    case "checklist":
      // Checklist is an object container
      return {
        type: "object",
        title: item.label,
      };

    default:
      throw new Error(`Unsupported item type: ${item.type}`);
  }
}

/* --------------------------------------------
 * UI schema generation
 * ------------------------------------------ */

function buildUiSchema(item: Item) {
  const ui: Record<string, any> = {};

  if (item.description) {
    // RJSF will render this using a custom Markdown field template
    ui["ui:description"] = item.description;
  }

  if (item.helpText) {
    ui["ui:help"] = item.helpText;
  }

  if (item.type === "checklist") {
    ui["ui:options"] = {
      collapsible: true,
    };
  }

  return ui;
}

/* --------------------------------------------
 * Conditional logic compilation
 * ------------------------------------------ */

function applyCondition(item: Item, schema: JSONSchema7) {
  /**
   * Converts:
   * when:
   *   field: hasImages
   *   equals: true
   *
   * Into JSON Schema:
   * if { hasImages === true }
   * then { require this field }
   */

  const condition = item.when!;
  const controllingField = condition.field;

  const ifSchema: JSONSchema7 = {
    properties: {
      [controllingField]: {},
    },
    required: [controllingField],
  };

  // Map condition operator
  if (condition.equals !== undefined) {
    ifSchema.properties![controllingField] = {
      const: condition.equals,
    };
  }

  if (condition.notEquals !== undefined) {
    ifSchema.properties![controllingField] = {
      not: { const: condition.notEquals },
    };
  }

  if (condition.in) {
    ifSchema.properties![controllingField] = {
      enum: condition.in,
    };
  }

  if (condition.exists !== undefined) {
    ifSchema.properties![controllingField] = condition.exists
      ? {}
      : { not: {} };
  }

  // Attach dependency to root schema
  schema.allOf = schema.allOf || [];
  schema.allOf.push({
    if: ifSchema,
    then: {
      required: [item.id],
    },
  });
}
