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

        public TripsController(DataContext context, IUserAccessor usserAccessor )
        {
            _context = context;
            _usserAccessor = usserAccessor;
        }

        // Get All trip
        [HttpGet]
        public async Task<ActionResult<List<Trip>>> GetTrips()
        {
            return await _context.Trips.ToListAsync();
        }

        // Get One Trip
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTrip(Guid id) {
            var trip =  await _context.Trips.FindAsync(id);
            if( trip == null) return NotFound();
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
                AppUserId = user.Id,
                TripId = trip.Id,
                IsHost = true
            };
            
            //  trip.Attendees.Add(attendee);
             _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Update trip
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrip(Guid id, [FromBody]Trip trip)
        {
            var item = await _context.Trips.FindAsync(id);
            if(item != null)
            {
                item.Title = trip.Title ?? item.Title;
                item.Author = trip.Author ?? item.Author;
                item.ShortDescription = trip.ShortDescription ?? item.ShortDescription;
                item.Description = trip.Description ?? item.Description;
                item.StartDate = trip.StartDate ;
                item.EndDate = trip.EndDate;
                item.PicCoverUrl = trip.PicCoverUrl ?? item.PicCoverUrl;
                item.rating = trip.rating ;
                item.Location = trip.Location ?? item.Location;
                item.cost = trip.cost;
                item.Duration = item.Duration ;
                item.createdAt = item.createdAt;
                // Add rest 
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
        // Delete trip
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
