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
            
            CreateMap<TripAttendee, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}