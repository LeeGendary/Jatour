using AutoMapper;
using AutoMapper.QueryableExtensions;
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

    public class ProfilesController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;


        public ProfilesController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            var user = await _context.Users.ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Username == username);

            if (user == null) return null;
            return Ok();
        }
    }
}
