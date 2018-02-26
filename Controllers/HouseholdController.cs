using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pantry.Models;

namespace pantry.Controllers
{
    [Route("api/[controller]")]
    public class HouseholdController : Controller
    {

        [HttpGet("[action]/{id}")]
        public IEnumerable<Models.FamilyMember> ListFamilyMembers(int id)
        {

            var db = new Models.PantryDBContext();
            var household = new Household(id);

            return household.GetFamilyMembers(db);
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Models.GoodType> ListGoodTypes(int id)
        {

            var db = new Models.PantryDBContext();
            var household = new Household(id);

            return household.GetGoodTypes(db);
        }

        [HttpPut("[action]/{id}")]
        public IActionResult AddFamilyMember(int id, [FromBody] Models.FamilyMember family_member)
        {

            var db = new Models.PantryDBContext();
            var household = new Household(id);

            household.AddFamilyMember(db, family_member);

            return Ok();
        }

        [HttpPut("[action]/{id}")]
        public IActionResult AddGoodType(int id, [FromBody] Models.GoodType good_type)
        {
            var db = new Models.PantryDBContext();
            var household = new Household(id);

            household.AddGoodType(db, good_type);

            return Ok();
        }

        [HttpDelete("[action]/{household_id}/{family_member_id}")]
        public IActionResult DeleteFamilyMember(int household_id, int family_member_id)
        {

            var db = new Models.PantryDBContext();
            var household = new Household(household_id);

            household.DeleteFamilyMemberById(db, family_member_id );

            return Ok();
        }
    }
}