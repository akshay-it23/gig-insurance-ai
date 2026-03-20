import morgan from 'morgan'

const morganFormat = ':method :url :status :res[content-length] - :response-time ms'

export const logger = morgan(morganFormat)

export default logger
