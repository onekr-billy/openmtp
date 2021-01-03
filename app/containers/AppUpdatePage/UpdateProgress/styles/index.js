import { mixins } from '../../../../styles/js';

export const styles = (theme) => ({
  root: {
    textAlign: `left`,
    ...mixins({ theme }).center,
    width: 500,
    marginTop: 10,
  },
  progressBodyText: {
    marginBottom: 10,
  },
  progressTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
