using Microsoft.EntityFrameworkCore.Storage;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] Password { get; set; }
        public byte[] PasswordSalt {get; set;}
    }
}