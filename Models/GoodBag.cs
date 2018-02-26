using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pantry.Models {

    [Table("goodbag")]
    public class GoodBag {

        [Column]
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Column("householdid")]
        public int HouseholdId { get; set; }

        [Column("name")]
        public int Name { get; set; }

        public void DoFirstTimeInit(PantryDBContext db) {

            db.GoodBags.Add(this);
            db.SaveChanges();
        }

        public void Delete(PantryDBContext db) {

            db.Remove(this);
            db.SaveChanges();
        }
    }
}