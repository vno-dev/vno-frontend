type BaseBaseKey = string;

export interface BaseRecord<KeyType = BaseBaseKey> extends Record<string, unknown> {
  id: KeyType;
  createdAt?: string;
  updatedAt?: string;
}
