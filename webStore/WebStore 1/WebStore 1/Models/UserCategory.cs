using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebStore_1.Models
{
    public class UserCategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
       
        [Index("CategoryIdAndApplicationId", 1, IsUnique = true)]
        public int CategoryId { get; set; }

        [Required]
        [Index("CategoryIdAndApplicationId", 2, IsUnique = true)]
        public int ApplicationId { get; set; }
    }
}