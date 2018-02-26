using System;
using System.Collections.Generic;
using System.Linq;
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

        public Household() {}

        public Household(int new_id) {

            this.id = new_id;
        }

        public void DoFirstTimeInit(PantryDBContext db) {

            db.Households.Add(this);
            db.SaveChanges();

            var settings = new AppSettings();
            settings.DoFirstTimeInit(db, this.id);
        }

        public IEnumerable<FamilyMember> GetFamilyMembers(PantryDBContext db) {

             return db.FamilyMembers.Where(fm => fm.HouseholdId == this.id);
        }

        public void AddFamilyMember(PantryDBContext db, FamilyMember new_family_member) {

            new_family_member.HouseholdId = this.id;
            db.FamilyMembers.Add(new_family_member);
            db.SaveChanges();
        }

        public void AddGoodType(PantryDBContext db, GoodType new_good_type) {

            new_good_type.HouseholdId = this.id;
            db.GoodTypes.Add(new_good_type);
            db.SaveChanges();
        }

        public IEnumerable<GoodType> GetGoodTypes(PantryDBContext db) {

            return db.GoodTypes.Where(gt => gt.HouseholdId == this.id);
        }

        public IEnumerable<AppSettings> GetAllAppSettings(PantryDBContext db) {

            return db.AppSettingses.Where(a => a.HouseholdId == this.id);
        }

        public void DeleteFamilyMemberById(PantryDBContext db, int family_member_id) {

            db.FamilyMembers
              .RemoveRange(db.FamilyMembers.Where(m => m.id == family_member_id && m.HouseholdId == this.id));
            db.SaveChanges();
        }

        public void Delete(PantryDBContext db) {
            
            foreach(var good_type in this.GetGoodTypes(db))
                good_type.Delete(db);
                
            foreach(var family_member in this.GetFamilyMembers(db))
                family_member.Delete(db);
                
            foreach(var app_settings in this.GetAllAppSettings(db))
                app_settings.Delete(db);

            db.Households.Remove(this);

            db.SaveChanges();
        }
    }
}