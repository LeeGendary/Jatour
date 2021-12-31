using JaTour.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace JaTour.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        public Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            throw new System.NotImplementedException();
        }

        public Task<string> DeletePhoto(string publicId)
        {
            throw new System.NotImplementedException();
        }
    }
}
