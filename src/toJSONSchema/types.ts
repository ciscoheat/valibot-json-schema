import { JSONSchema7 } from 'json-schema';
import { BaseSchema, BaseSchemaAsync } from 'valibot';
import { ValueOf } from '../utils/ValueOf';
import { SupportedSchemas } from './schemas';

export const DateStrategy = {
    string: 'string',
    integer: 'integer',
} as const;
export type DateStrategy = ValueOf<typeof DateStrategy>;

export const UndefinedStrategy = {
    any: 'any',
} as const;
export type UndefinedStrategy = ValueOf<typeof UndefinedStrategy>;

export const BigIntStrategy = {
    string: 'string',
    integer: 'integer',
} as const;
export type BigIntStrategy = ValueOf<typeof BigIntStrategy>;

export interface ToJSONSchemaOptions {
    /**
     * Main schema (referenced at the root of the JSON schema).
     */
    schema?: BaseSchema | BaseSchemaAsync;
    /**
     * Additional schemas (referenced in the JSON schema `definitions`).
     */
    definitions?: Record<string, SupportedSchemas>;
    /**
     * Make all object type strict (`additionalProperties: false`).
     */
    strictObjectTypes?: boolean;
    /**
     * Date output:
     * 'integer' sets the type to 'integer' and format to 'unix-time'.
     * 'string' sets the type to 'string' and format to 'date-time'.
     */
    dateStrategy?: DateStrategy;
    /**
     * Undefined output:
     * 'any' sets the type to 'any'
     */
    undefinedStrategy?: UndefinedStrategy;
    /**
     * How bigint schema should be converted:
     * - 'integer': uses integer type with format 'int64' (see https://ajv.js.org/packages/ajv-formats.html#formats)
     * - 'string': uses string type
     */
    bigintStrategy?: DateStrategy;
    /**
     * If true, do not throw an error on validations that cannot be
     * converted to JSON schema, like `custom`.
     */
    ignoreUnknownValidation?: boolean;
}

export interface Context
    extends Pick<
        ToJSONSchemaOptions,
        'strictObjectTypes' | 'dateStrategy' | 'undefinedStrategy' | 'bigintStrategy' | 'ignoreUnknownValidation'
    > {
    /**
     * Mapping from schema to name
     */
    defNameMap: DefinitionNameMap;
}

export type DefinitionNameMap = Map<SupportedSchemas, string>;

export type BaseConverter = (schema: SupportedSchemas) => JSONSchema7;
