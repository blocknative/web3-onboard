import type { WalletInit } from '@web3-onboard/common';
import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';

type AuthTypes = 'email' | 'phone' | 'google' | 'apple' | 'twitter' | 'facebook' | 'microsoft' | 'linkedin' | 'github' | 'twitch' | 'discord';

interface PreferredAuthType {
  type: AuthTypes;
  setAsDisplay: boolean;
}

type ParticleAuthOptions = Omit<ParticleAuthModuleOptions, 'preferredAuthType'>;

interface ParticleAuthModuleOptions extends ParticleAuthOptions {
  preferredAuthType?: AuthTypes | PreferredAuthType;
}

const getDisplayLabel = (authType?: string, shouldSetDisplay?: boolean) => {
  return shouldSetDisplay ? authType?.charAt(0).toUpperCase() + authType?.slice(1) : 'Particle Network';
};

const particleAuth = (options: ParticleAuthModuleOptions): WalletInit => {
  const { preferredAuthType, ...otherOptions } = options;
  const isAuthTypeObject = typeof preferredAuthType === 'object';
  const { type: authType, setAsDisplay } = isAuthTypeObject ? (preferredAuthType as PreferredAuthType) : {};

  const displayLabel = getDisplayLabel(authType, isAuthTypeObject && setAsDisplay);

  return () => ({
    label: displayLabel,
    getIcon: async () => {
      const iconName = (authType && (isAuthTypeObject ? setAsDisplay : false)) ? authType : 'icon';
      return (await import(`./${iconName}.ts`)).default;
    },
    getInterface: async ({ EventEmitter, chains }) => {
      const [currentChain] = chains;
      const { label, id } = currentChain;
      const chainProps = {
        chainName: label.split(' ')[0].toLowerCase(),
        chainId: parseInt(id.toString(), 16),
      };

      const particle = new ParticleNetwork({ ...otherOptions, ...chainProps });

      const loginOptions = authType ? { preferredAuthType: authType } : undefined;
      await particle.auth.login(loginOptions);

      return {
        provider: new ParticleProvider(particle.auth),
        instance: particle,
      };
    },
  });
};

export default particleAuth;