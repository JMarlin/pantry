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

        [HttpGet("[action]/{id}")]
        public Models.Household GetSingle(int id)
        {

            var db = new Models.PantryDBContext();
            
            return db.Households.Where(h => h.id == id).FirstOrDefault(); 
        }

        [HttpPut("[action]")]
        public IActionResult Add([FromBody] Models.Household household)
        {

            var db = new Models.PantryDBContext();
            db.Households.Add(household);
            db.SaveChanges();

            return Ok();
        }

        [HttpDelete("[action]/{id}")]
        public IActionResult Delete(int id)
        {

            var db = new Models.PantryDBContext();
            db.Households.RemoveRange(db.Households.Where(h => h.id == id));
            db.SaveChanges();

            return Ok();
        }
    }
}