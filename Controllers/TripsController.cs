﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using JaTour.DTOs;
using JaTour.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JaTour.Controllers
{
    public class TripsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _usserAccessor;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TripsController(DataContext context, IUserAccessor usserAccessor, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
            _context = context;
            _usserAccessor = usserAccessor;
        }

        // Get All trip
        [HttpGet]
        public async Task<ActionResult<List<TripDto>>> GetTrips()
        {
            return await _context.Trips.ProjectTo<TripDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // Get One Trip
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetTrip(Guid id)
        {
            var trip = await _context.Trips.ProjectTo<TripDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == id);
            if (trip == null) return NotFound();
            return trip;
        }

        

        // create trip
        [HttpPost]
        public async Task<IActionResult> CreateTrip(Trip trip)
        {
            AppUser user = await _context.Users.FirstOrDefaultAsync(x =>
            x.UserName == _usserAccessor.Getusername());

            var attendee = new TripAttendee
            {
                AppUser = user,
                Trip = trip,
                IsHost = true
            };

            trip.Attendees.Add(attendee);
            // Add Author
            trip.Author = user.UserName;
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Update trip
        // [Authorize(Policy ="IsTripHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrip(Guid id, [FromBody] Trip trip)
        {
            var item = await _context.Trips.FindAsync(id);
            if (item != null)
            {
                _mapper.Map(trip, item);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> UpdateAttendance(Guid id)
        {
            var trip = await _context.Trips.Include(a => a.Attendees)
            .ThenInclude(u => u.AppUser)
            .SingleOrDefaultAsync(x => x.Id == id);

            if (trip == null) return NotFound();
             var user = await _context.Users.FirstOrDefaultAsync(x =>
            x.UserName == _usserAccessor.Getusername()); 
            if (user  == null) return null;

            var Author = trip.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;
            var attendance = trip.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

            if (attendance != null && Author == user.UserName)
            {
                // Add a Toggle
                trip.IsCancelled = !trip.IsCancelled;
            }

            if(attendance != null && Author != user.UserName){
                trip.Attendees.Remove(attendance);
            }

            if(attendance == null)
            {
                attendance = new TripAttendee
                {
                    AppUser = user,
                    Trip = trip,
                    IsHost = false
                };
                trip.Attendees.Add(attendance);
            }
            return Ok(await _context.SaveChangesAsync() > 0);
        }
        // Delete trip
        [Authorize(Policy ="IsTripHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Trip>> DeleteTrip(Guid id)
        {
            var item = await _context.Trips.FindAsync(id);
            if (item != null)
            {
                _context.Trips.Remove(item);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
