using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace JaTour.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
           // get user Id
           var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
           if(userId == null) return Task.CompletedTask;

           var TripId = Guid.Parse(_httpContextAccessor.HttpContext?.Request
           .RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());

           var attendee = _dbContext.TripAttendees
           .AsNoTracking()
           .SingleOrDefaultAsync(x => x.AppUserId == userId && x.TripId == TripId)
           .Result;

           if(attendee == null) return Task.CompletedTask;

           if(attendee.IsHost) context.Succeed(requirement);
           return Task.CompletedTask;
        }
    }
}