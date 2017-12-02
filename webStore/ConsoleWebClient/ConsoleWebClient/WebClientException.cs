using System;

namespace ConsoleWebClient
{
    [Serializable]
    public class WebClientException : Exception
    {
        public WebClientException() { }
        public WebClientException(string message) : base(message) { }
        public WebClientException(string message, Exception inner) : base(message, inner) { }
        protected WebClientException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
