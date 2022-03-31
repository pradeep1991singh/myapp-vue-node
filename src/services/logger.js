import logdown from 'logdown';

const logger = logdown('app');
// eslint-disable-next-line
logger.state.isEnabled = process.env.NODE_ENV === 'development'

export default logger;
