using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace pantry.Controllers
{
    [Route("api/[controller]")]
    public class HouseholdController : Controller
    {

        [HttpGet("[action]/{id}")]
        public IEnumerable<Models.FamilyMember> ListFamilyMembers(int id)
        {

            var db = new Models.PantryDBContext();
            
            return db.Households.Where(h => h.id == id).FirstOrDefault().FamilyMembers; 
        }

        [HttpPut("[action]/{id}")]
        public IActionResult AddFamilyMember(int id, [FromBody] Models.FamilyMember family_member)
        {
            var db = new Models.PantryDBContext();
            var households = db.Households.Where(h => h.id == id);

            if(households.Count() < 1)
                return NotFound();

            family_member.HouseholdId = id;
            family_member.Household = households.First();
            db.FamilyMembers.Add(family_member);
            db.SaveChanges();

            return Ok();
        }

        [HttpDelete("[action]/{id}")]
        public IActionResult DeleteFamilyMember(int id)
        {

            var db = new Models.PantryDBContext();
            db.FamilyMembers
              .RemoveRange(db.FamilyMembers.Where(m => m.id == id));
            db.SaveChanges();

            return Ok();
        }
    }
}