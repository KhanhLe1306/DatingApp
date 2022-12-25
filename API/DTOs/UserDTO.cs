using System.Data;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.DTOs
{
    public class UserDTO
    {
        public string Username { get; set; }
        public string Token { get; set; }
    }
}