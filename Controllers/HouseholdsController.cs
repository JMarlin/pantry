using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace pantry.Controllers
{
    [Route("api/[controller]")]
    public class HouseholdsController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<Models.Household> List()
        {

            var db = new Models.PantryDBContext();
            
            return db.Households; 
        }
    }
}