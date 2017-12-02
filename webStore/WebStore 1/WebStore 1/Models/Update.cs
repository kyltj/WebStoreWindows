using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebStore_1.Models
{
    [Table("Update")]
    public class Update
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [ForeignKey("Application")]
        public int ApplicationId { get; set; }
        public Application Application { get; set; }
        [Required]
        public string Version { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string Path { get; set; }
        [Required]
        public bool Hide { get; set; }
        [Required]
        public bool Delete { get; set; }
    }
}