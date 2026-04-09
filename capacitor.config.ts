import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.elementbreaker.app',
  appName: '원소브레이커',
  webDir: 'out',
  android: {
    backgroundColor: '#000000',
  },
  plugins: {
    StatusBar: {
      hidden: true,
    },
  },
};

export default config;
