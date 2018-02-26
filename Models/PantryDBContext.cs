using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace pantry.Models {

    public class PantryDBContext : DbContext {

        public PantryDBContext() {}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {

            optionsBuilder.UseNpgsql("Server=localhost;Database=pantryapp;Username=pantryapp;Password=pantrypass");
        }

        public DbSet<Household> Households { get; set; }
        public DbSet<FamilyMember> FamilyMembers { get; set; }
        public DbSet<AppSettings> AppSettingses { get; set; }
        public DbSet<GoodType> GoodTypes { get; set; }
        //public DbSet<GoodInstance> GoodInstances { get; set; }
        public DbSet<GoodBag> GoodBags { get; set; }
        //public DbSet<Recipe> Recipes { get; set; }
        //public DbSet<MealItem> MealItems { get; set; }
        //public DbSet<Meal> Meals { get; set; }
        //public DbSet<GroceryTrip> GroceryTrips { get; set; }
        //public DbSet<PurchasedGood> PurchasedGoods { get; set; }
    }
}