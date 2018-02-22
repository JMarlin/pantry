using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pantry.Models {

    [Table("household")]
    public class Household {

        [Column]
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("code")]
        public string Code { get; set; }

        public void DoFirstTimeInit(PantryDBContext db) {

            db.Households.Add(this);
            db.SaveChanges();

            var settings = new AppSettings();
            settings.DoFirstTimeInit(db, this.id);
        }

        public void Delete(PantryDBContext db) {
            
            foreach(var good_type in db.GoodTypes.Where(gt => gt.HouseholdId == this.id))
                good_type.Delete(db);
                
            foreach(var family_member in db.FamilyMembers.Where(fm => fm.HouseholdId == this.id))
                family_member.Delete(db);
                
            foreach(var app_settings in db.AppSettingses.Where(a => a.HouseholdId == this.id))
                app_settings.Delete(db);

            db.Households.Remove(this);

            db.SaveChanges();
        }
    }
}