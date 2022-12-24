using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(LoginDTO loginDTO)
        {
            // Check if username is taken
            if (await UsernameExist(loginDTO.Username)) return BadRequest("User exists!");
            // If username is not taken
            // Create hashed password

            using var hmac = new HMACSHA512();
            var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            var temp = await this._context.Users.AddAsync(new AppUser
            {
                UserName = loginDTO.Username,
                Password = hashedPassword, 
                PasswordSalt = hmac.Key
            });
            await this._context.SaveChangesAsync();

            return temp.Entity;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDTO loginDTO)
        {
            var user = await this._context.Users.SingleOrDefaultAsync(x => x.UserName == loginDTO.Username);
            if (user == null) return Unauthorized();

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedPassword.Length; i++){
                if(user.Password[i] != computedPassword[i]) return Unauthorized();
            }

            return user;
        }

        public async Task<bool> UsernameExist(string username){
            return await this._context.Users.AnyAsync(x => x.UserName == username);
        }
    }
}