using System;
using Microsoft.AspNetCore.Mvc;

namespace JaTour.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()=> NotFound();

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() => BadRequest(new ProblemDetails{Title = "This is a bad request"});


        [HttpGet("Unauthorised")]
        public ActionResult GetUnauthorized()=> Unauthorized();

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
          ModelState.AddModelError("Problem1", "first error message");
          return ValidationProblem();  
        }
        
        [HttpGet("server-error")]
        public ActionResult GetServerError() => throw new Exception("This is server error");
    }
}