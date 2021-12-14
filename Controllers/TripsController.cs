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
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly DataContext _context;
        public TripsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Trip>>> GetTrips()
        {
            return await _context.Trips.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTrip(Guid id) {
            return await _context.Trips.FindAsync(id);
        }

        // create trip
        [HttpPost]
        public async Task<IActionResult> CreateTrip(Trip trip)
        {
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
