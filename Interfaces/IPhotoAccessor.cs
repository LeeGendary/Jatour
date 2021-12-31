
using JaTour.Photos;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace JaTour.Interfaces
{
    // This method will be used to upload photo to Cloudinary
    // It won't affect the database.
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhotoAsync(IFormFile File);
        Task<string> DeletePhotoAsync(string publicId);
    }
}
