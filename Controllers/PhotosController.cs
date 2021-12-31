using JaTour.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Models;
using System.Linq;
using System.Threading.Tasks;

namespace JaTour.Controllers
{
    public class PhotosController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _usserAccessor;
        private readonly IPhotoAccessor _photoAccessor;


        public PhotosController(DataContext context, IUserAccessor usserAccessor, IPhotoAccessor photoAccessor)
        {
            _context = context;
            _usserAccessor = usserAccessor;
            _photoAccessor = photoAccessor;
        }

        // Get One Trip
        [HttpPost("addPhoto")]
        public async Task<ActionResult<Photo>> AddPhoto(IFormFile File)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _usserAccessor.Getusername());
            if (user == null) return null;

            var photoUploadResult = await _photoAccessor.AddPhotoAsync(File);
            
            var photo = new Photo
            {
                Url = photoUploadResult.Url.ToString(),
                Id = photoUploadResult.PublicId
            };

            if(!user.Photos.Any(x => x.IsMain))  photo.IsMain = true;

            user.Photos.Add(photo);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(photo);
            return BadRequest("Problem adding photo");
        }
    }
}
