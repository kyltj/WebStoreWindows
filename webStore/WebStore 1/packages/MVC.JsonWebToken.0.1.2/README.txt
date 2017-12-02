Add the following to your App_Start\FilterConfig.cs file under the Register method:

filters.Add(new JsonWebTokenValidationAttribute
{
    Audience = "...your-client-id...",  // this could be stored on config
    SymmetricKey = "...your-client-secret...."  // this could be stored on config
});