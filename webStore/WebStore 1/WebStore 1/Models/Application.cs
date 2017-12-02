using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;


namespace WebStore_1.Models
{
    [Table("Application")]

    public class Application
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Version { get; set; }
        [Required]
        public string Path { get; set; }
        [Required]
        public string PathIcon { get; set; }
        [Required]
        public string Date { get; set; }
        public IEnumerable<Update> Updates { get; set; }
        public IEnumerable<Category> Categories { get; set; }
        [ForeignKey("ApplicationUser")]
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        [Required]
        public bool Hide { get; set; }
        [Required]
        public bool Delete { get; set; }
        [Required]
        public string Package { get; set; }


    } 
}