using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace JaTour.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("/[controller]")]
    public class BaseApiController : ControllerBase
    {   
    }
}