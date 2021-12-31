using System.Linq;
using AutoMapper;
using JaTour.DTOs;
using Persistence.Models;

namespace JaTour.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Trip, Trip>();
            CreateMap<Trip, TripDto>()
            
            .ForMember(d => d.Author, o => o.MapFrom(s => s.Attendees
            .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            
            CreateMap<TripAttendee, AttendeeDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}