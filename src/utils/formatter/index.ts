type CustomError = {
  code: string;
  message: string;
};

export const formatResponse = ({
  data = null,
  errors = null,
  message = null,
}: {
  data?: Record<string, any> | null;
  errors?: CustomError[] | null;
  message?: string | null;
}) => {
  return {
    data,
    errors,
    message,
  };
};
