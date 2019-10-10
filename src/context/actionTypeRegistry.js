import createRegistry from 'mag-service-registry';

const registry = createRegistry();

export const registerActionTypes = registry.register;

export default registry.exposeRegistered();
