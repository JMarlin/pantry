using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pantry.Models {

    [Table("appsettings")]
    public class AppSettings {

        [Column]
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Column("householdid")]
        public int HouseholdId { get; set; }

        [Column("dateapplied")]
        public DateTime DateApplied { get; set; }

        [Column("shoppingday")]
        public int ShoppingDay { get; set; }
        
        [Column("pantryid")]
        public int PantryId { get; set; }

        public void DoFirstTimeInit(PantryDBContext db, int household_id) {

            var pantry = new GoodBag();
            pantry.DoFirstTimeInit(db, household_id);

            this.ShoppingDay = 0;
            this.PantryId = pantry.id;
            this.HouseholdId = household_id;

            db.AppSettingses.Add(this);
            db.SaveChanges();
        }

        public void Delete(PantryDBContext db) {

            foreach(GoodBag good_bag in this.GetGoodBag())
                good_bag.Delete(db);
            
            db.AppSettingses.Remove(this);
            db.SaveChanges();
        }
    }
}