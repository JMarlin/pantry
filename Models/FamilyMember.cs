using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace pantry.Models {

    [Table("familymember")]
    public class FamilyMember {

        [Column]
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Column("firstname")]
        [StringLength(255)]
        public string FirstName { get; set; }

        [Column("lastname")]
        [StringLength(255)]
        public string LastName { get; set; }

        [Column("householdid")]
        private int _household_id { get; set; }

        [ForeignKey("_household_id")]
        public Household Household { get; set; }
    }
}