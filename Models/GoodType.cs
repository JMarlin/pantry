using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace pantry.Models {

    [Table("goodtype")]
    public class GoodType {

        [Column]
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }

        [Column("defaultmeasure")]
        [StringLength(255)]
        public string DefaultMeasure { get; set; }

        [Column("householdid")]
        public int HouseholdId { get; set; }

        public void Delete(PantryDBContext db) {

            //Need to also delete all instances of this type later
            db.GoodTypes.Remove(this);
            db.SaveChanges();
        }
    }
}