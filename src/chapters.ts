export type ch = {
  colors: { [key: string]: string };
};

export interface Chapters {
  [key: string]: ch;
}

export const chapters: Chapters = {
  '1': {
    colors: {
      background: '#F1F9CB',
      player: '#4285f4',
      platform: '#fbbc05',
      spike: '#fbbc05',
      jumppad: '#fbbc05',
      end: '#34a853',
      nonplatform: '#ea4335',
      nonspike: '#ea4335',
    },
  },
};
