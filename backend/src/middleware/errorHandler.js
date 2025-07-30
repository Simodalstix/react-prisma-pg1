import winston from "winston";

// Configure logger locally to avoid circular imports
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error("Error occurred:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Prisma errors
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      error: {
        message: "A record with this data already exists",
        code: "DUPLICATE_ENTRY",
      },
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      error: {
        message: "Record not found",
        code: "NOT_FOUND",
      },
    });
  }

  // Validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        details: err.errors,
      },
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: "INTERNAL_ERROR",
    },
  });
};
