using JaTour.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;


namespace JaTour.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        //get user token
        public string Getusername()
        {
            return _httpContextAccessor.HttpContext.User.Identity.Name;
        }
    }
}
