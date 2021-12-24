using AutoMapper;
using Persistence.Models;

namespace JaTour.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Trip, Trip>();
        }
    }
}