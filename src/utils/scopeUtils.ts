import { Scope } from './../types/scopes';

export const userHasScope = (scopes: Scope[], scope: Scope) => {
  return scopes.includes(scope);
};
