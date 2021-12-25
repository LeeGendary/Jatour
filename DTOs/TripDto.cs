using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using JaTour.Profiles;

namespace JaTour.DTOs
{
    public class TripDto
    {
        public Guid Id { get; set; }
        public String Title { get; set; }
        public String Author { get; set; }
        public String ShortDescription { get; set; }
        public String Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public String PicCoverUrl { get; set; }
        public Decimal rating { get; set; }
        public String Location { get; set; }

        [DataType(DataType.Currency)]
        public Decimal cost { get; set; }
        public int Duration { get; set; }
        public DateTime createdAt { get; set; }
        public ICollection<Profile> Attendees { get; set; }
    }
}