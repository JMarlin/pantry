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
    }
}